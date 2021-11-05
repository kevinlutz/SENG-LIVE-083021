import {useEffect} from 'react'
function Filter({genres, handleFilterBooks}){

    return(
      <>
        <div className="row-menu">
            {genres.map(genre => <div onClick={(e) => handleFilterBooks(e.target.id)} key={genre} id={genre}>{genre}</div> )}
        </div>
      </>
    )
  }
  export default Filter;
  