create database vr2016 default charset utf8;
use vr2016;
grant all privileges on vr2016.* to 'test'@'%';

create table records (
    id bigint primary key auto_increment,
    content text,
    user_id bigint,
    nickname varchar(255),
    avatar text,
    create_at timestamp default now(),
    snows integer default 0
);
create index idx_records_snows on records(snows);

create table vote_log (
    id bigint primary key auto_increment,
    user_id bigint,
    record_id bigint,
    create_at timestamp default now()
);

create index idx_vote_log_user_id_record_id on vote_log(user_id, record_id);

create table link_views(
    id bigint primary key auto_increment,
    urlkey varchar(32),
    url text,
    views integer default 1,
    create_at timestamp default now(),
    update_at timestamp default now()
);

create index idx_link_views_key on link_views(urlkey);