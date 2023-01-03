class Lessons {
    static async getLessonsList() {
		
		const response = await fetch('http://localhost:3000/api/lessons');

		return await response.json();
    }

	static async addLesson(newLesson) {
		const response = await fetch('http://localhost:3000/api/lesson', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newLesson)
		});

		return await response.json();
	}

	static async getLesson(id) {
		const response = await fetch(`http://localhost:3000/api/lesson/${id}`);

		return await response.json();
	}

	static async editLesson(updatedLesson) {
		await fetch(`http://localhost:3000/api/lesson/${updatedLesson.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updatedLesson)
		});
	}
	static async changeLessonStatus(updatedLesson) {
		await fetch(`http://localhost:3000/api/lesson/${updatedLesson.id}/done`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updatedLesson)

		});
	}

	static async clearLessonsList() {
		await fetch(`http://localhost:3000/api/lessons`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
		});
	}

	static async removeLesson(lesson) {
		await fetch(`http://localhost:3000/api/lesson/${lesson.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}


}

export default Lessons;