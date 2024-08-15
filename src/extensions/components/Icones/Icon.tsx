import * as React from 'react'

export default function Icon({ items }) {
    return (
        <div>
            {items.length > 0 ? items.map((icon, index) => {
                return (
                    <li className="nav-item" key={index}>
                        <a className="nav-link" aria-current="page" href={icon.Link}>
                            <img src={icon.AttachmentFiles[0].ServerRelativeUrl } alt={icon.Title} />
                        </a>
                    </li>
                )
            }): null }
        </div>
    )
}
