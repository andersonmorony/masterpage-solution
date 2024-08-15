import * as React from 'react'

export default function Links({ items }) {
    return (
        <div>
            {items.length > 0 ? items.map((link, index) => {
                return (
                    <a key={index} className="nav-link" aria-current="page" href={link.Link ? link.Link.Url : '#'}>
                        {link.Title}                            
                    </a>
                )
            }): null }
        </div>
    )
}