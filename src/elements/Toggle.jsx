function Toggle({toggleColorTheme}) {

    const handleClick = (event) => {
        const selector = event.target.classList;
        selector.contains('toggle_on') ? selector.remove('toggle_on') : selector.add('toggle_on');
        toggleColorTheme()
    }

    return ( 
        <div className="toggle_div" >
            <div onClick={handleClick} className="toggle_switch"></div>
        </div>
     );
}

export default Toggle;