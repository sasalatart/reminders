# == Schema Information
#
# Table name: reminders
#
#  id         :integer          not null, primary key
#  title      :string
#  body       :text
#  due_date   :datetime
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Reminder < ActiveRecord::Base
  belongs_to :owner, class_name: :User, foreign_key: 'user_id'

  validates :owner, presence: true
  validates :title, presence: true

  def to_json
    { id: id, title: title, body: body, due_date: due_date, user_id: user_id }
  end
end
