# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## userテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, foreign_key: true|
|email|string|null: false, unique: true, foreign_key: true|
|password|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|


### Association
- has_many :groups, through: :member
- has_many :messages

## groupテーブル

|Column|Type|Options|
|------|----|-------|
|groupname|string|null: false, unique: true, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|


### Association
- has_many :users, throuhg: :member
- has_many :messages

## memberテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|


## messageテーブル

|Column|Type|Options|
|------|----|-------|
|text|string|null: false, foreign_key: true|
|image|string|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
