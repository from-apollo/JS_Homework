import Component from '../../views/component.js';

class About extends Component {
    static async render() {
        return `
            <div class="about"> 
                <h1 class="page-title">Привет, студент МехМата!</h1>                   
                <p class="about__info">
                    Я помогу составить твоё расписание на день.
                    <br>
                    Наслаждайся!
                </p>
                <a class="about__btn-start button" href="#/lessons" title="Нажми сюда, чтобы начать составлять расписание!">
                    Составить расписание 
                </a>
            </div>
        `;
    }
}

export default About;