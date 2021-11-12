class BookDetailSerializer < BookSerializer
  has_many :readers
end
