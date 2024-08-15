import * as React from 'react';
import { sp } from '@pnp/sp';

import './Masterpage.css'
import './MasterpageMobile.css'
import Links from './Links/Links';
import Icon from './Icones/Icon';
const icon_card = require('../images/cad.svg')
const logo = require('../images/logo.png')

export interface ImyState {
    links?: any []
    icones?: any []
    ServerRelativeUrl: string;
}

export default class Header extends React.Component<{ context }, ImyState> {

    constructor(props) {
        super(props);

        sp.setup({
            spfxContext: this.props.context
        });

        this.state = {
            links: [],
            icones: [],
            ServerRelativeUrl: ''
        }
    }


    async getList() {
            try {
                const listName = "Links Rapidos";
                const filter = "Status eq 1";
                const select = "Title, Link, AttachmentFiles";
                const expand = "AttachmentFiles"
                const orderBy = "Ordem";
                const isAscending = true;
        
                const list = sp.web.lists.getByTitle(listName);
                let items = list.items;
                if (filter) items = items.filter(filter);
                if (select) items = items.select(select);
                if (expand) items = items.expand(expand);
                if (orderBy) items = items.orderBy(orderBy, isAscending);
        
                const response = await items.get();
                console.log(response)

                const _links = response.filter((item) => { return item.AttachmentFiles.length < 1})
                const _icons = response.filter((item) => { return item.AttachmentFiles.length > 0})
                
                this.setState({links: _links, icones: _icons })

            }catch(ex)
            {
                console.log(ex);
            }
        }

    async componentDidMount() {
        await this.getList();
        const sharepoint = await sp.web.get();
        this.setState({ ServerRelativeUrl: sharepoint.ServerRelativeUrl })
        console.log(sharepoint)
    }

    public render(): React.ReactElement<{}> {

        const { 
            icones,
            links,
            ServerRelativeUrl
        } = this.state;

        return (
            <div id="header">
                <div className="container-fluid" id="link-rapido">
                    <button className="btn-cadastrar">
                        <img src={icon_card} alt="" />
                        <span>Cadastrar</span>
                    </button>
                    <ul id="icons" className="nav justify-content-end icons">
                        <Icon items={icones} />
                    </ul>
                    <ul id="links" className="nav justify-content-end links">
                        <Links items={links} />
                    </ul>
                </div>
                <div className="containet-fluid" id="header-body">
                    <a href={ServerRelativeUrl}>
                        <img className="logo" src={logo} alt="Logo" />
                    </a>
                    <div className="right-side desktop">
                        <input type="text" placeholder="O que você procura neste site?" />
                    </div>
                </div>
                <div className="right-side search-mobile">
                    <input type="text" placeholder="O que você procura?" />
                </div>
            </div>
        )
    }
}
