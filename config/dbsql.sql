CREATE DATABASE IF NOT EXISTS fastival;

USE fastival;

create table if not exists fastival_kr(
  api_id int(255)auto_increment,
  title varchar(100)not null,
  subtitle varchar(100),
  main_place varchar(100),
  addr1 varchar(200)not null,
  addr2 varchar(200),
  cntct_tel varchar(50),
  homepage_url varchar(500),
  trfc_info varchar(500),
  usage_day varchar(500),
  usage_day_week_and_time varchar(200),
  usage_amount varchar(500),
  main_img_normal varchar(500),
  main_img_thumb varchar(500),
  itemcntnts varchar(500),
  primary key(api_id)
);
