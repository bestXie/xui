/**
 * Created by wlh on 16/9/10.
 */
'use strict';
let request = require("request");
let db = require('./db');
let C = require("./config")
let express = require("express");
let helper = require('./helper');

let router = express();
let routes = [];

const ERROR = {
  "NEED_ACCESS_TOKEN": {code: 403, msg: '登录凭证不能为空'},
  "NEED_CONTENT": {code: 500, msg: '内容不能为空'},
  "SCCUESS": {code: 200, msg: 'SUCCESS'},
  "OUT_LIMIT": {code: 500, msg: '超过最大限制'},
  NOT_EXIST: {code: 404, msg: '记录不存在'},
  VOTE_TOO_MANY: {code: 405, msg: '今日投票次数已到，明日再来吧'}
}

//test

function getUser(access_token, cb) {
  request.get(C.wechatUserService, {
    qs: {
      access_token: access_token,
    }
  },function(err, resp, body) {
    if (err) return cb(err);
    if (typeof body == 'string') {
      body = JSON.parse(body);
    }
    if (body.code && body.code != 200) {
      return cb(body);
    }
    cb(null, body);
  })
}

function requireAccessToken(req, res, next) {
  let access_token = req.query.access_token;
  if (!access_token) {
    return res.json(ERROR.NEED_ACCESS_TOKEN);
  }

  //去获取用户
  getUser(access_token, function(err, data) {
    if (err) return next(err);
    req.user = data;
    next();
  })
}

routes.push({
  method: 'post',
  middleware: [requireAccessToken],
  url: '/record/create',
  fn: function(req, res, next) {
    let content = req.body.content;
    let user = req.user;
    if (!content) {
      return res.json(ERROR.NEED_CONTENT);
    }

    let sql = `INSERT INTO records ( content, user_id, nickname, avatar) 
    values('${content}', ${user.id}, '${user.nickname}', '${user.avatar}');`;
    return db.query(sql)
      .then( (ret)=> {
        res.json({
          id: ret.insertId,
          nickname: user.nickname,
          avatar: user.avatar,
          content: content,
          snows: 0,
        })
      }).catch(next);
  }
})

routes.push({
  method: 'get',
  middleware: [requireAccessToken],
  url: '/record/:id',
  fn: (req, res, next) => {
    let recordId= req.params.id;
    let sql = `SELECT * FROM records WHERE id = ${recordId} LIMIT 1`;
    return db.query(sql)
        .then( (rows) => {
          if (rows && rows.length) {
            return res.json(rows[0]);
          }
          return res.json(ERROR.NOT_EXIST);
        })
        .catch(next);
  }
})

routes.push( {
  method: 'post',
  middleware: [requireAccessToken],
  url: '/record/:id/vote',
  fn: function(req, res, next) {
    let recordId = req.params.id;
    let user = req.user;
    let snows = req.body.snows || 1;

    let sql = `SELECT count(1) as total FROM vote_log WHERE user_id = ${user.id} AND record_id = ${recordId} AND create_at > CURDATE()`;
    return db.query(sql)
        .then( (rows) => {
          return rows[0]['total'];
        })
        .then( (total) => {
          if (total >= 3) {
            return res.json(ERROR.VOTE_TOO_MANY);
          }
          sql = `INSERT INTO vote_log(user_id, record_id) VALUES(${user.id}, ${recordId})`;
          return db.query(sql)
              .then( ()=> {
                sql = `UPDATE records set snows = snows + ${snows} WHERE id = ${recordId}`;
                return db.query(sql)
              })
              .then( (records) => {
                res.json(ERROR.SCCUESS)
              })
        }).catch(next);
  }
})

routes.push({
  method: 'get',
  middleware: [requireAccessToken],
  url: '/records',
  fn: function(req, res, next) {
    let orderby = req.query.orderby;
    let p = req.query.p || 1;
    let pz = req.query.pz || 20;
    pz = pz > 0 ? pz : 20;
    let avaOrders = ['snows', 'create_at'];
    if (avaOrders.indexOf(orderby) < 0) {
      orderby = 'snows';
    }
    let offset = (p-1) * pz;
    offset = offset >= 0 ? offset : 0;

    let sql = `SELECT * FROM records order by ${orderby} desc limit ${pz} offset ${offset}`;
    return db.query(sql)
      .then((rows) => {
        res.json(rows)
      }).catch(next);
  }
});

routes.push({
  method: 'get',
  url: '/wechat/get-user',
  fn: (req, res, next) => {
    res.json({
      nickname: '王大拿',
      avatar: '',
      id: 1,
    })
  }
});

routes.push({
  url: '/link/view',
  method: 'post',
  fn: (req, res, next) => {
    let url = req.body.url;
    if (!url) {
      return res.json({code: 500, msg: 'URL不存在'});
    }
    let urlkey = helper.md5(url);
    let sql = `SELECT count(1) as total FROM link_views WHERE urlkey='${urlkey}'`;
    return db.query(sql)
        .then( (result) => {
          return result[0]['total'];
        })
        .then( (total) => {
          if (total && total > 0) {
            sql = `UPDATE link_views set views = views + 1, update_at=now() WHERE urlkey='${urlkey}'`;
            return db.query(sql)
          }
          sql = `INSERT INTO link_views (urlkey, url) VALUES('${urlkey}', '${url}');`;
          return db.query(sql);
        })
        .then( (ret)=> {
          res.json(ERROR.SCCUESS);
        })
  }
})

routes.push({
  method: 'get',
  url: '/link/view',
  fn: (req, res, next) => {
    let urls = req.query.urls;
    urls = urls.split(/,/g);
    if (urls.length > 50) {
      return res.json(ERROR.OUT_LIMIT)
    }
    let ps = urls.map( (url) => {
      let urlkey = helper.md5(url);
      let sql = `SELECT views FROM link_views WHERE urlkey = '${urlkey}' LIMIT 1`;
      return db.query(sql)
          .then( (rows) => {
            let views = 0;
            if (rows && rows.length) {
              views = rows[0]['views']
            }
            return {url: url, views: views};
          })
    })
    return Promise.all(ps)
        .then((result) => {
          res.json(result);
        })
        .catch(next)
  }
});

routes.push({
  url: '/user-info',
  method: 'get',
  middleware: [requireAccessToken],
  fn: (req, res, next) => {
    let user = req.user;
    return res.json({
      id: user.id,
      nickname: user.nickname,
      avatar: user.avatar,
    })
  }
})

for(let r of routes) {
  let method = r.method || 'get';
  let url = r.url;
  let fn = r.fn;
  let middleware = r.middleware || [];
  router[method](url, middleware, fn);
}

module.exports = router;