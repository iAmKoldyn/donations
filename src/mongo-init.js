db = db.getSiblingDB('mongodb');
db.createUser({
    user: 'user',
    pwd: 'password',
    roles: ['readWrite'],
});
