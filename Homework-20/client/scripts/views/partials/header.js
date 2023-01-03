import Component from '../../views/component.js';

class Header extends Component {
    static async render() {
        const page = this.urlParts.page;

        return `
            <header class="header">                    
                <a class="header__link ${!page ? 'active' : ''}" href="#/">
                    О приложении
                </a>
                <a class="header__link ${page === 'lessons' ? 'active' : ''}" href="#/lessons">
                    Расписание
                </a>                                       
            </header>
        `;
    }
}

export default Header;