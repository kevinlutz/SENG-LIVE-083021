function Header({storeName, handleDarkMode}){
    return(
      <div>
        <h1>{storeName}</h1>
        <label>
          Dark Mode
        <input onChange={handleDarkMode} type="checkbox" id="dark-mode-checkbox" name="dark-mode" value="dark-mode"></input>
        </label>
      </div>
    )
  }
  //Exporting books
  export default Header;
  