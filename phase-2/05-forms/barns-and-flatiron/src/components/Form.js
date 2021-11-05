function Form(){
    return(
      <>
        <form className="general-form">
            <label>
                Title:
                <input type="text" name="title" />
            </label>
            <label>
                Author:
                <input type="text" name="author" />
            </label>
            <label>
                Genre:
                <input type="text" name="author" />
            </label>
            <label>
                Description:
                <textarea name="description" />
            </label>
            <input type="submit" value="Submit" />
        </form>
      </>
    )
  }
  export default Form;