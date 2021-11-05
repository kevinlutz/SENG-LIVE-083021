import {useState} from 'react'
function Form({addBook}){
    //TODO:Add handleChange that will update our form values and store them in state
    const [formData, setFormData] = useState({
        title:'',
        author:'',
        genre:'',
        description:'',
        image:''
    })
    function handleChange(e){
        console.log(e.target.name)
        console.log(e.target.value)
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        addBook(formData)
    }

    return(
      <>
        <form onSubmit={handleSubmit} className="general-form">
            <label>
                Title:
                <input 
                    type="text" 
                    name="title"
                    onChange={handleChange}
                    value={formData.title}
                    />
            </label>
            <label>
                Author:
                <input 
                    type="text" 
                    name="author" 
                    onChange={handleChange}
                    value={formData.author}
                    />
            </label>
            <label>
                Genre:
                <input 
                    type="text" 
                    name="genre"
                    onChange={handleChange}
                    value={formData.genre}
                    />
            </label>
            <label>
                image:
                <input 
                    type="text" 
                    name="image" 
                    onChange={handleChange}
                    value={formData.image}
                    />
            </label>
            <label>
                Description:
                <textarea 
                    name="description"
                    onChange={handleChange}
                    value={formData.description}
                    />
            </label>
            <input type="submit" value="Submit" />
        </form>
      </>
    )
  }
  export default Form;

