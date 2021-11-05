class BooksController < ApplicationController
  def index
    render json: Book.all
  end

  def show
    render json: Book.find(params[:id]), include: [:readers]
  end

  def create
    book = Book.create(book_params)
    if book.valid?
      render json: book, status: :created
    else
      render json: { errors: book.errors }, status: :unprocessable_entity
    end
  end

  private

  def book_params
    params.permit(:title, :description, :author, :cover_image_url)
  end
end
