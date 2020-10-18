let db;

export default class TodoService {

    constructor() {
        this.initializeDB();
    }

    initializeDB() {
        db = new Dexie('todoDB');
    
        db.version(1).stores({
            reports: '++id,type, level, date'
        });
    
        db.on('populate', async () => {
            await db.reports.bulkPut([
                { type: 'Safe', level: 'One', date: 'Today' },
            ]);
        });
    
    }

    getAll() {
        return db.reports.toArray();
    }

    getById(id) {
        return db.reports.get(id);
    }

    save(report) {
        return db.reports.put(report);
    }

    delete(id) {
        return db.reports.delete(id);
    }
    
}
