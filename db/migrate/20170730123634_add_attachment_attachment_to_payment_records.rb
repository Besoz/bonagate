class AddAttachmentAttachmentToPaymentRecords < ActiveRecord::Migration
  def self.up
    change_table :payment_records do |t|
      t.attachment :attachment
    end
  end

  def self.down
    remove_attachment :payment_records, :attachment
  end
end
