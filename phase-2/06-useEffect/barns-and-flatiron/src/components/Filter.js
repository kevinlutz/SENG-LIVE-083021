
function Filter({genres, handleGenreFilter}){
    return(
      <>
        <div className="row-menu">
            {genres.map(genre => <div onClick={(e)=> handleGenreFilter(e.target.id)} key={genre} id={genre}>{genre}</div> )}
        </div>
      </>
    )
  }
  export default Filter;
  