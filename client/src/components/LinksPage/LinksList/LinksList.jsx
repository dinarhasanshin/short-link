import React from 'react'
import {Link} from 'react-router-dom'

export const LinksList = ({links}) => {
    if (!links.length){
        return <p>Ссылок пока нет</p>
    }
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Обычная ссылка</th>
                    <th>Сокращённая ссылка</th>
                    <th>Кликов</th>
                    <th>Открыть</th>
                </tr>
                </thead>
                <tbody>
                {links.map((link, index) => {
                    return(
                        <tr key={link._id}>
                            <td>{index}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>{link.clicks}</td>
                            <td>
                                <Link to={`/detail/${link._id}`}>Открыть</Link>
                            </td>
                        </tr>
                    )
                })}

                </tbody>
            </table>
        </div>
    )
}