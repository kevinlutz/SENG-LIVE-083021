
function Filter({genres}){
    return(
      <>
        <div className="row-menu">
            {genres.map(genre => <div key={genre}>{genre}</div> )}
        </div>
      </>
    )
  }
  export default Filter;
  