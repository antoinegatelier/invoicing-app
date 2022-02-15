function Article(props) {

    const state = props.props;

    return ( 
        <article>
            {state.map(prop => <p>{prop}</p>)}
        </article>
     );
}

export default Article;