using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using WebBll;
using WebUtility;

namespace WeiXinWeb.Activities.PuFaBank
{
    /// <summary>
    /// Handler 的摘要说明
    /// </summary>
    public class Handler : IHttpHandler
    {
        HttpContext context;
        public void ProcessRequest(HttpContext context1)
        {
            this.context = context1;
            context.Response.ContentType = "text/plain";
            string result = Execute();
            context.Response.Write(result);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        public string Execute()
        {
            string type = context.Request.QueryString["type"];
            string result = string.Empty;

            switch (type)
            {
                //发送验证码
                case "sendCode": result = SendCode(); break;
                //得到优惠券
                case "getCoupon": result = GetCoupon(); break;
                //是否领取过
                //case "IsGet": result = IsGet(); break;
                //是否是司机
                //case "IsDriver": result = IsDriver(); break;
                default: result = ""; break;
            }

            return result;
        }

        public string SendCode()
        {
            string phone = context.Request.QueryString["phone"];
            int code = GetID();
            new D_CheckCodeBLL().Insert(phone, code.ToString(), 9);

            GetData gd = new GetData();
            string json = "Phone=" + phone + "&SmsContent=" + code + "(领券验证码，请完成验证)，如非本人操作，请忽略本短信&CreateUser=wx";
            string url = "http://114.141.132.129:6666/Api/SendSms/SendNow";
            string result = gd.SendPostRequest(url, json, Encoding.UTF8, Encoding.UTF8);
            return result;
        }

        public string GetCoupon()
        {
            string bankCode = context.Request.QueryString["bankCode"];
            if (CheckBankCode(bankCode) < 0)
            {
                string retString = "{\"Status\":-6,\"youhuima\":\"\",\"money\":0.00,\"Description\":\"失败\"}";
                return retString;
            }

            Coupon d = new Coupon();
            d.Phone = context.Request.QueryString["phone"];
            d.Code = context.Request.QueryString["code"];

            string checkCode = context.Request.QueryString["checkCode"];
            string result = GetCode(d.Phone, checkCode);
            if (result == "1")
            {
                try
                {
                    JavaScriptSerializer java = new JavaScriptSerializer();
                    string json = java.Serialize(d);
                    string Url = "http://y.aidaijia.com/coupon/api/discount/getCoupon";
                    HttpWebRequest request = (HttpWebRequest)WebRequest.Create(Url);
                    request.Method = "POST";
                    request.ContentType = "application/json";
                    request.ContentLength = Encoding.UTF8.GetByteCount(json);
                    Stream myRequestStream = request.GetRequestStream();
                    StreamWriter myStreamWriter = new StreamWriter(myRequestStream, Encoding.GetEncoding("gb2312"));
                    myStreamWriter.Write(json);
                    myStreamWriter.Close();
                    HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                    Stream myResponseStream = response.GetResponseStream();
                    StreamReader myStreamReader = new StreamReader(myResponseStream, Encoding.GetEncoding("utf-8"));
                    string retString = myStreamReader.ReadToEnd();
                    myStreamReader.Close();
                    myResponseStream.Close();
                    return retString;
                }
                catch (Exception e)
                {
                    string retString = "{\"Status\":0,\"youhuima\":\"\",\"money\":0.00,\"Description\":\"失败\"}";
                    return retString;
                }

            }
            else
            {
                return "{\"Status\":-5,\"youhuima\":\"BE834E4F3D5C\",\"money\":1.00,\"Description\":\"成功\"}";
            }
        }

        public string GetCode(string phone, string code)
        {
            //验证码是否正确
            string sqlCode = new D_CheckCodeBLL().GetCode(phone, 9);
            if (code == sqlCode)
            {
                return "1";
            }
            else
            {
                //验证不通过
                return "0";
            }
        }

        private int GetID()
        {
            int[] arr = { 2250, 2000, 6000, 1447, 4444 };

            Random rd = new Random();
            int num = rd.Next(1000, 10000);
            //查数据
            if (arr.Contains(num))
            {
                GetID();
            }
            return num;

        }

        private int CheckBankCode(string code) 
        {
            //验证前6位是否正确
            //code = code.Substring(0,6);
            string[] aid = { "517650", "625958", "625971", "625957", "456418", "622228", "515672", "622276", "622176", "625970", "622177", "377185", "550216", 
                               "356851", "356850", "404738", "404739", "498451", "525998", "356852", "418152", "625831", "512451", "625993", "622277", "478060",
                               "530975", "433645", "628222", "377186", "622693", "377187" };
            return Array.IndexOf(aid, code);
        }

    }

    public class Coupon
    {
        public string Phone { get; set; }
        public string Code { get; set; }
    }

    public class result
    {
        public int Status { get; set; }
        public decimal Money { get; set; }
        public string Description { get; set; }
    }
}