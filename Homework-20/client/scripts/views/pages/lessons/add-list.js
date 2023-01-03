import Component from '../../component.js';

import Lessons from '../../../models/lessons.js';

class AddAndList extends Component {
	static async getData() {
        return await Lessons.getLessonsList();
    }

    static async render(lessons) {
		return `
            <h1 class="page-title">Расписание</h1>
        
            <div class="lesson-add">
                <input class="lesson-add__day" type="text" placeholder="День недели">
                <input class="lesson-add__title" type="text" placeholder="Название дисциплины">
                <textarea class="lesson-add__description" placeholder="Описание дисциплины"></textarea>
             
                <button class="lesson-add__btn-add button" disabled>Добавить дисциплину</button>
            </div>
     
            <div class="lessons">
                <div class="lessons__additional">
                    <p class="lessons__counter"></p>
                    
                    <button class="lessons__btn-clear button" ${!lessons.length ? 'disabled' : ''}>
                        Очистить список дисциплин
                    </button>
                </div>
                
                <div class="lessons__list">
                    ${lessons.map(lesson => this.getLessonHTML(lesson)).join('')}
                </div>
            </div>
        `;
    }

    static afterRender() {
        this.setActions();

		this.countLessonsAmount();
    }

    static setActions() {
        const lessonDayField = document.getElementsByClassName('lesson-add__day')[0],
            lessonTitleField = document.getElementsByClassName('lesson-add__title')[0],
            lessonDescriptionField = document.getElementsByClassName('lesson-add__description')[0],
			addLessonBtn = document.getElementsByClassName('lesson-add__btn-add')[0],
			lessonsContainer = document.getElementsByClassName('lessons')[0],
			clearLessonsListBtn = lessonsContainer.getElementsByClassName('lessons__btn-clear')[0],
			lessonsList = lessonsContainer.getElementsByClassName('lessons__list')[0];

        lessonTitleField.onkeyup = () => addLessonBtn.disabled = !lessonTitleField.value.trim();
        addLessonBtn.onclick = () => this.addLesson(lessonDayField, lessonTitleField, lessonDescriptionField, addLessonBtn,
            clearLessonsListBtn, lessonsList);

		lessonsContainer.onclick = evt => {
            const target = evt.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('lessons__btn-clear'):
                    this.clearLessonsList(lessonsList, clearLessonsListBtn);
                    break;

                case targetClassList.contains('lesson'):
                case targetClassList.contains('lesson__title'):
                    this.redirectToLessonInfo(target.dataset.id);
                    break;

                case targetClassList.contains('lesson__btn-done'):
                    this.changeLessonStatus(target.parentNode.parentNode,
                                          target.previousElementSibling, target);
                    break;

                case targetClassList.contains('lesson__btn-remove'):
                    this.removeLesson(lessonsList, target.parentNode.parentNode, clearLessonsListBtn);
                    break;
            }
        };
    }

    static async addLesson(lessonDayField, lessonTitleField, lessonDescriptionField, addLessonBtn, clearLessonsListBtn, lessonsList) {
        let newLesson = {
            day: lessonDayField.value.trim(),
            title: lessonTitleField.value.trim(),
            description: lessonDescriptionField.value.trim()
        };

        newLesson = await Lessons.addLesson(newLesson);

        this.clearAddLesson(lessonDayField, lessonTitleField, lessonDescriptionField, addLessonBtn);
        clearLessonsListBtn.disabled && (clearLessonsListBtn.disabled = false);

        lessonsList.insertAdjacentHTML('beforeEnd', this.getLessonHTML(newLesson));

        this.countLessonsAmount();
    }

    static getLessonHTML(lesson) {
    	const statusDone = lesson.status === 'Done';

        return `
            <div class="lesson ${statusDone ? 'lesson_done' : ''}" data-id="${lesson.id}">
                <a class="lesson__title" data-id="${lesson.id}">${lesson.title}</a>
                
                <div class="lesson__buttons">
                	${!statusDone ?
                    	`<a class="lesson__btn-edit button" href="#/lesson/${lesson.id}/edit">Редактировать</a>
                    	 <a class="lesson__btn-done button">Завершено</a>`
					: ''}
                    <a class="task__btn-remove button">Удалить</a>   
                </div>                            
            </div>
        `;
    }

    static clearAddLesson(lessonDayField, lessonTitleField, lessonDescriptionField, addLessonBtn) {
        lessonDayField.value = '';
        lessonTitleField.value = '';
        lessonDescriptionField.value = '';
        addLessonBtn.disabled = true;
    }

    static countLessonsAmount() {
        const lessonsCounter = document.getElementsByClassName('lessons__counter')[0],
            totalAmount = document.getElementsByClassName('lesson').length,
            doneAmount = document.getElementsByClassName('lesson_done').length,
            lessonWordForm = (doneAmount === 1) ? 'дисциплина' : 'дисциплины';
            lessonsCounter.innerHTML = !totalAmount ?
            'Список дисциплин пуст. Можно идти домой!' :
            `<span class="lessons__counter-done">${doneAmount}</span> ${lessonWordForm} из ` +
            `<span class="lessons__counter-total">${totalAmount}</span> завершены`;
    }

    static async clearLessonsList(lessonsList, clearLessonsListBtn) {
        if (confirm('Ты уверен?')) {

            clearLessonsListBtn.disabled = true;
            lessonsList.innerHTML = '';
            await Lessons.clearLessonsList();
            this.countLessonsAmount();
        }
    }

    static redirectToLessonInfo(id) {
        location.hash = `#/lesson/${id}`;
    }

    static async changeLessonStatus(lessonContainer, editLessonBtn, doneLessonBtn) {

        lessonContainer.classList.add('lesson_done');
        editLessonBtn.remove();
        doneLessonBtn.remove();
        await Lessons.changeLessonStatus(lessonContainer.dataset);
        this.countLessonsAmount();
    }

    static async removeLesson(lessonsList, lessonContainer, clearLessonsListBtn) {
        if (confirm('Ты уверен?')) {

            lessonContainer.remove();
            !lessonsList.children.length && (clearLessonsListBtn.disabled = true);

            await Lessons.removeLesson(lessonContainer.dataset.id);
            this.countLessonsAmount();
        }
    }
}

export default AddAndList;