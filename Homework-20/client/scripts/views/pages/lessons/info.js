import Component from '../../component.js';

import Error404 from '../error404.js';

import Lessons from '../../../models/lessons.js';

class Info extends Component {
	static async getData() {
		return await Lessons.getLesson(this.urlParts.id);
	}

    static async render(lesson) {
		let html;

		if (!lesson.error) {
			const {id, day, title, description, status} = lesson;

			html = `
				<h1 class="page-title">Информация о дисциплине</h1>
				
				<div class="lesson-info">
					<p>
						<b>День недели:</b>
						${day}
					</p>
					<p>
						<b>Название дисциплины:</b>
						${title}
					</p>
					<p>
						<b>Описание дисциплины:</b>
						${description}
					</p>
					<p>
						<b>Статус завершённости дисциплины:</b>
						${status}
					</p>
					
					<div class="lesson-info__buttons">
						${status !== 'Done' ?
							`<a class="lesson-info__btn-edit button" href="#/lesson/${id}/edit">Редактировать дисциплину</a>`
						: ''}
						<a class="lesson-info__btn-back button" href="#/lessons">Вернуться к списку дисциплин</a>
					</div>
				</div>
			`;
		} else {
			html = Error404.render();
		}

		return html;
    }
}

export default Info;