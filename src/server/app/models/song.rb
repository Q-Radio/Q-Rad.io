class Song
  include Mongoid::Document
  field :name, type: String
  field :artist, type: String
  field :album, type: String

  validates :name, presence: true
  validates :artist, presence: true
  validates :album, presence: true
end
