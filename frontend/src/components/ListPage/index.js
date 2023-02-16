import Post from "./post"

const ListPage = ({ filteredResults }) => {
    const results = filteredResults.map(spot => <Post key={spot.id} spot={spot} />)

    const content = results?.length ? results : <article><p>No Matching Results</p></article>

    return (
        <main>{content}</main>
    )
}

export default ListPage
