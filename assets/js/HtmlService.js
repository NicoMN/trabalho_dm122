export default class HtmlService {

    constructor(todoService) {
        this.todoService = todoService;
        this.bindFormEvent();
        this.listReports();
    }

    bindFormEvent() {
        const form = document.querySelector('form');
        form.addEventListener('submit', event => {
            event.preventDefault();
            this.addReport(form.typeItem.value, form.levelItem.value, form.dateItem.value);
            form.reset();
        })
    }

    async addReport(type, level, date) {
        const report = { type, level, date};
        const reportId = await this.todoService.save(report);
        console.log(reportId);
        report.id = reportId;
        this.addToHtmlList(report);
    }

    async listReports() {
        const reports = await this.todoService.getAll();
        reports.forEach(report => this.addToHtmlList(report));
    }

    async saveReport(reportId) {
        const report = await this.todoService.getById(reportId);
        this.todoService.save(report);
    }


    async deleteReport(li) {
        const reportId = +li.getAttribute('data-item-id');
        await this.todoService.delete(reportId);
        li.remove();        
    }

    addToHtmlList(report) {
        const ul = document.querySelector('ul');
        const liElement = document.createElement('li');
        const spanElement = document.createElement('span');
        const btnElement = document.createElement('button');

        liElement.setAttribute('data-item-id', report.id);

        spanElement.textContent = "Type: " + report.type + "    Level: " + report.level + "     Date: " + report.date;

        btnElement.textContent = 'x';
        btnElement.addEventListener('click', event => {
            event.stopPropagation();
            this.deleteReport(liElement);
        })

        liElement.appendChild(spanElement);
        liElement.appendChild(btnElement);
        ul.appendChild(liElement);


    }

}