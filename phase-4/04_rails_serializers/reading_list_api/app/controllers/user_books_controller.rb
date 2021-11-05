class UserBooksController < ApplicationController

  def create
    user_book = current_user.user_books.create(user_book_params)
    if user_book.valid?
      render json: user_book, status: :created
    else
      render json: { errors: user_book.errors }, status: :unprocessable_entity
    end
  end

  def update
    user_book = UserBook.find(params[:id])
    if user_book.update(update_user_book_params)
      render json: user_book, status: :ok
    else
      render json: { errors: user_book.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    UserBook.find(params[:id]).destroy
  end

  private

  def user_book_params
    params.permit(:book_id)
  end

  def update_user_book_params
    params.permit(:read)
  end
end
