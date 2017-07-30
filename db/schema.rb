# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170727132646) do

  create_table "companies", force: :cascade do |t|
    t.string   "name",                limit: 255
    t.integer  "user_id",             limit: 4
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.string   "avatar_file_name",    limit: 255
    t.string   "avatar_content_type", limit: 255
    t.integer  "avatar_file_size",    limit: 4
    t.datetime "avatar_updated_at"
    t.string   "email",               limit: 255
    t.string   "phone",               limit: 255
    t.string   "facebook",            limit: 255
    t.string   "gplus",               limit: 255
    t.string   "twitter",             limit: 255
    t.text     "overview",            limit: 65535
    t.string   "state",               limit: 255
  end

  add_index "companies", ["user_id"], name: "index_companies_on_user_id", using: :btree

  create_table "company_users", force: :cascade do |t|
    t.integer  "user_id",    limit: 4
    t.integer  "company_id", limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "role",       limit: 255
  end

  add_index "company_users", ["company_id"], name: "index_company_users_on_company_id", using: :btree
  add_index "company_users", ["user_id"], name: "index_company_users_on_user_id", using: :btree

  create_table "properties", force: :cascade do |t|
    t.string   "address",            limit: 255
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.integer  "company_id",         limit: 4,   null: false
    t.integer  "property_type_id",   limit: 4,   null: false
    t.integer  "property_status_id", limit: 4,   null: false
    t.integer  "property_state_id",  limit: 4
    t.string   "state",              limit: 255
    t.float    "lat",                limit: 53
    t.float    "lng",                limit: 53
    t.string   "country",            limit: 255
    t.string   "city",               limit: 255
    t.string   "area",               limit: 255
    t.string   "street",             limit: 255
    t.integer  "number",             limit: 4
    t.integer  "floor",              limit: 4
  end

  add_index "properties", ["company_id"], name: "index_properties_on_company_id", using: :btree
  add_index "properties", ["property_state_id"], name: "fk_rails_ab7c95c33f", using: :btree
  add_index "properties", ["property_status_id"], name: "fk_rails_ebe018537f", using: :btree
  add_index "properties", ["property_type_id"], name: "index_properties_on_property_type_id", using: :btree

  create_table "property_detail_categories", force: :cascade do |t|
    t.string   "name_en",    limit: 255
    t.string   "name_ar",    limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "state",      limit: 255
  end

  create_table "property_detail_instance_value_options", force: :cascade do |t|
    t.integer  "property_detail_instance_id",     limit: 4
    t.integer  "property_detail_value_option_id", limit: 4
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
  end

  add_index "property_detail_instance_value_options", ["property_detail_instance_id"], name: "index_detail_instance_value_options_on_detail_instance_id", using: :btree
  add_index "property_detail_instance_value_options", ["property_detail_value_option_id"], name: "index_detail_instance_value_options_on_detail_value_option_id", using: :btree

  create_table "property_detail_instances", force: :cascade do |t|
    t.integer  "property_id",        limit: 4
    t.integer  "property_detail_id", limit: 4
    t.string   "value",              limit: 255
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  add_index "property_detail_instances", ["property_detail_id"], name: "index_property_detail_instances_on_property_detail_id", using: :btree
  add_index "property_detail_instances", ["property_id"], name: "index_property_detail_instances_on_property_id", using: :btree

  create_table "property_detail_queries", force: :cascade do |t|
    t.string   "value",              limit: 255
    t.integer  "property_detail_id", limit: 4
    t.integer  "user_id",            limit: 4
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  create_table "property_detail_value_options", force: :cascade do |t|
    t.string   "name_en",            limit: 255
    t.string   "name_ar",            limit: 255
    t.integer  "property_detail_id", limit: 4
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  add_index "property_detail_value_options", ["property_detail_id"], name: "index_property_detail_value_options_on_property_detail_id", using: :btree

  create_table "property_details", force: :cascade do |t|
    t.string   "code",                        limit: 255
    t.string   "name",                        limit: 255
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.string   "value_type",                  limit: 255
    t.string   "state",                       limit: 255
    t.string   "value_options",               limit: 255
    t.boolean  "mandatory",                   limit: 1
    t.integer  "property_detail_category_id", limit: 4
  end

  add_index "property_details", ["code"], name: "index_property_details_on_code", unique: true, using: :btree
  add_index "property_details", ["property_detail_category_id"], name: "index_property_details_on_property_detail_category_id", using: :btree

  create_table "property_images", force: :cascade do |t|
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.string   "avatar_file_name",    limit: 255
    t.string   "avatar_content_type", limit: 255
    t.integer  "avatar_file_size",    limit: 4
    t.datetime "avatar_updated_at"
    t.integer  "property_id",         limit: 4
  end

  add_index "property_images", ["property_id"], name: "index_property_images_on_property_id", using: :btree

  create_table "property_service_type_instances", force: :cascade do |t|
    t.string   "unit",            limit: 255
    t.string   "unit_price",      limit: 255
    t.integer  "service_type_id", limit: 4
    t.integer  "property_id",     limit: 4
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "property_service_types", force: :cascade do |t|
    t.string   "code",       limit: 255
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "state",      limit: 255
  end

  add_index "property_service_types", ["code"], name: "index_property_service_types_on_code", unique: true, using: :btree

  create_table "property_states", force: :cascade do |t|
    t.string   "code",       limit: 255
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "state",      limit: 255
  end

  add_index "property_states", ["code"], name: "index_property_states_on_code", unique: true, using: :btree

  create_table "property_statuses", force: :cascade do |t|
    t.string   "code",       limit: 255
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "state",      limit: 255
  end

  add_index "property_statuses", ["code"], name: "index_property_statuses_on_code", unique: true, using: :btree

  create_table "property_type_details", force: :cascade do |t|
    t.integer  "property_type_id",   limit: 4
    t.integer  "property_detail_id", limit: 4
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  add_index "property_type_details", ["property_detail_id"], name: "index_property_type_details_on_property_detail_id", using: :btree
  add_index "property_type_details", ["property_type_id"], name: "index_property_type_details_on_property_type_id", using: :btree

  create_table "property_types", force: :cascade do |t|
    t.string   "code",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "name",       limit: 255
    t.string   "state",      limit: 255
  end

  add_index "property_types", ["code"], name: "index_property_types_on_code", unique: true, using: :btree

  create_table "shared_properties", force: :cascade do |t|
    t.integer  "company_id",  limit: 4
    t.integer  "property_id", limit: 4
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  add_index "shared_properties", ["company_id"], name: "index_shared_properties_on_company_id", using: :btree
  add_index "shared_properties", ["property_id"], name: "index_shared_properties_on_property_id", using: :btree

  create_table "user_favorite_properties", force: :cascade do |t|
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.integer  "user_id",     limit: 4
    t.integer  "property_id", limit: 4
  end

  add_index "user_favorite_properties", ["property_id"], name: "index_user_favorite_properties_on_property_id", using: :btree
  add_index "user_favorite_properties", ["user_id", "property_id"], name: "index_user_favorite_properties_on_user_id_and_property_id", unique: true, using: :btree
  add_index "user_favorite_properties", ["user_id"], name: "index_user_favorite_properties_on_user_id", using: :btree

  create_table "user_invitations", force: :cascade do |t|
    t.string   "random_key",     limit: 255
    t.string   "reciever_email", limit: 255
    t.string   "reciever_name",  limit: 255
    t.integer  "company_id",     limit: 4
    t.integer  "user_id",        limit: 4
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.string   "state",          limit: 255
  end

  add_index "user_invitations", ["company_id"], name: "index_user_invitations_on_company_id", using: :btree
  add_index "user_invitations", ["random_key"], name: "index_user_invitations_on_random_key", unique: true, using: :btree
  add_index "user_invitations", ["user_id"], name: "index_user_invitations_on_user_id", using: :btree

  create_table "user_sessions", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",               limit: 255
    t.string   "crypted_password",    limit: 255
    t.string   "password_salt",       limit: 255
    t.string   "persistence_token",   limit: 255
    t.string   "single_access_token", limit: 255
    t.string   "perishable_token",    limit: 255
    t.integer  "login_count",         limit: 4,   default: 0,     null: false
    t.integer  "failed_login_count",  limit: 4,   default: 0,     null: false
    t.datetime "last_request_at"
    t.datetime "current_login_at"
    t.datetime "last_login_at"
    t.string   "current_login_ip",    limit: 255
    t.string   "last_login_ip",       limit: 255
    t.boolean  "active",              limit: 1,   default: false
    t.boolean  "approved",            limit: 1,   default: false
    t.boolean  "confirmed",           limit: 1,   default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "role",                limit: 255
    t.string   "first_name",          limit: 255
    t.string   "last_name",           limit: 255
    t.string   "phone",               limit: 255
    t.string   "avatar_file_name",    limit: 255
    t.string   "avatar_content_type", limit: 255
    t.integer  "avatar_file_size",    limit: 4
    t.datetime "avatar_updated_at"
    t.string   "locale",              limit: 255
  end

  add_index "users", ["perishable_token"], name: "index_users_on_perishable_token", unique: true, using: :btree
  add_index "users", ["persistence_token"], name: "index_users_on_persistence_token", unique: true, using: :btree
  add_index "users", ["single_access_token"], name: "index_users_on_single_access_token", unique: true, using: :btree

  add_foreign_key "companies", "users"
  add_foreign_key "company_users", "companies"
  add_foreign_key "company_users", "users"
  add_foreign_key "properties", "companies"
  add_foreign_key "properties", "property_states"
  add_foreign_key "properties", "property_statuses"
  add_foreign_key "properties", "property_types"
  add_foreign_key "property_detail_instance_value_options", "property_detail_instances"
  add_foreign_key "property_detail_instance_value_options", "property_detail_value_options"
  add_foreign_key "property_detail_instances", "properties"
  add_foreign_key "property_detail_instances", "property_details"
  add_foreign_key "property_detail_value_options", "property_details"
  add_foreign_key "property_details", "property_detail_categories"
  add_foreign_key "property_images", "properties"
  add_foreign_key "property_type_details", "property_details"
  add_foreign_key "property_type_details", "property_types"
  add_foreign_key "shared_properties", "companies"
  add_foreign_key "shared_properties", "properties"
  add_foreign_key "user_invitations", "companies"
  add_foreign_key "user_invitations", "users"
end
