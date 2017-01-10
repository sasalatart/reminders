class CreateReminders < ActiveRecord::Migration[5.0]
  def change
    create_table :reminders do |t|
      t.string :title
      t.text :body
      t.datetime :due_date
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
