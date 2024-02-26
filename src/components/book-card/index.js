import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";

import style from './style.module.sass'

const altThumbnail = 'https://media.istockphoto.com/id/182732882/photo/book-cover.webp?b=1&s=170667a&w=0&k=20&c=0tjneAWTvuAAoZ9JqMycZnzbPBha3ZDXqH66WEGd1YY='

const BookCard = ({data}) => {
    let {
        id,
        title,
        subtitle,
        thumbnail
    } = data

    title = title.length > 25 ? title.substring(0, 25) + "..." : title
    if (subtitle) {
        subtitle = subtitle.length > 25 ? subtitle.substring(0, 25) + "..." : subtitle
    }

    return (
        <Card className={'h-100'}>
            <Link to={`/book/${id}`}>
                <Card.Img variant={'top'} className={style.card_img} src={thumbnail || altThumbnail} />
            </Link>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                {subtitle ? <Card.Subtitle>{subtitle}</Card.Subtitle> : null}
            </Card.Body>
        </Card>
    )
}

export default BookCard