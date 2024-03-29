import {parseCurrentURL} from './helpers/utils.js';

import Header from './views/partials/header.js';
import Footer from './views/partials/footer.js';

import AddAndList from './views/pages/lessons/add-list.js';
import Info from './views/pages/lessons/info.js';
import Edit from './views/pages/lessons/edit.js';

import About from './views/pages/about.js';
import Error404 from './views/pages/error404.js';
const Routes = {
    '/': About,
    '/lessons': AddAndList,
    '/lesson/:id': Info,
    '/lesson/:id/edit': Edit
};

const router = async() => {
    const headerContainer = document.getElementsByClassName('header-container')[0],
          contentContainer = document.getElementsByClassName('content-container')[0];

    const urlParts = parseCurrentURL(),
        pagePath = `/${urlParts.page || ''}${urlParts.id ? '/:id' : ''}${urlParts.action ? `/${urlParts.action}` : ''}`,
        Page = Routes[pagePath] ? Routes[pagePath] : Error404;

    headerContainer.innerHTML = await Header.render();

    const pageData = await Page.getData();
    contentContainer.innerHTML = await Page.render(pageData);
    Page.afterRender();
};

(async() => {
    const footerContainer = document.getElementsByClassName('footer-container')[0];

    footerContainer.innerHTML = await Footer.render();
})();

window.onload = router;
window.onhashchange = router;