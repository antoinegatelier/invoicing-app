function Article(props) {

    const state = props.props;

    return ( 
        <article className={props.className}>
            {state.map((prop, index) => <p key={index}>{prop}</p>)}
        </article>
     );
}

export default Article;