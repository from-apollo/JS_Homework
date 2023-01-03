import Component from '../../component.js';

import Error404 from '../error404.js';

import Lessons from '../../../models/lessons.js';

class Edit extends Component {
    static async getData() {
        this.lesson = await Lessons.getLesson(this.urlParts.id);

        return this.lesson;
    }

    static async render(lesson) {
        let html;

        if (this.isEditEnable()) {
            const {id, day, title, description} = lesson;

            html = `
                <h1 class="page-title">Редактирование дисциплины</h1>
                
                <div class="lesson-edit">
                    <p>
                        <b>День недели:</b>
                        <input class="lesson-edit__day" type="text" value="${day}">
                    </p>
                    <p>
                        <b>Название дисциплины:</b>
                        <input class="lesson-edit__title" type="text" value="${title}">
                    </p>
                    <p>
                        <b>Описание дисциплины:</b>
                        <textarea class="lesson-edit__description">${(description === 'No Description') ? '' : description}</textarea>
                    </p>
            
                    <div class="lesson-edit__buttons">
                        <button class="lesson-edit__btn-save button">Сохранить дисциплину</button>
                        <a class="lesson-edit__btn-back button" href="#/lesson/${id}">Вернуться к информации</a>
                    </div>
                </div>
            `;
        } else {
            html = Error404.render();
        }

        return html;
    }

    static afterRender() {
       this.isEditEnable() && this.setActions();
    }

	static isEditEnable() {
		return !this.lesson.error &&
               this.lesson.status !== 'Done' &&
               !location.hash.split(this.urlParts.action)[1];
	}

    static setActions() {
        const lessonDayField = document.getElementsByClassName('lesson-edit__day')[0],
            lessonTitleField = document.getElementsByClassName('lesson-edit__title')[0],
            lessonDescriptionField = document.getElementsByClassName('lesson-edit__description')[0],
			saveLessonBtn = document.getElementsByClassName('lesson-edit__btn-save')[0];

        lessonTitleField.onkeyup = () => saveLessonBtn.disabled = !lessonTitleField.value.trim();
        saveLessonBtn.onclick = () => this.editLesson(lessonDayField, lessonTitleField, lessonDescriptionField);
    }

    static async editLesson(lessonDayField, lessonTitleField, lessonDescriptionField) {
        this.lesson.day = lessonDayField.value.trim();
        this.lesson.title = lessonTitleField.value.trim();
        this.lesson.description = lessonDescriptionField.value.trim();

		await Lessons.editLesson(this.lesson);

        this.redirectToLessonInfo();
    }

    static redirectToLessonInfo() {
        location.hash = `#/lesson/${this.lesson.id}`;
    }
}

export default Edit;