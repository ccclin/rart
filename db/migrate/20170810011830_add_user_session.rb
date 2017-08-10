class AddUserSession < ActiveRecord::Migration[5.1]
  def change
    create_table :user_sessions do |t|
      t.references :user
      t.string :uuid
      t.datetime :expired_at
      t.timestamps null: false
    end

    add_index :user_sessions, :uuid, unique: true, using: :btree
  end
end
