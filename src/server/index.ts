import { AddressBook } from './AddressBook';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';


const app = express();
const jsonParser = bodyParser.json();

const addressBook = new AddressBook();
app.use(express.static(path.resolve(__dirname, '..', '../client/dist')));



app.get('/contacts/paginated', async (req, res) => {
	try{
		const {page, itemsPerPage} = req.query;
		const contacts = await addressBook.getContactsPaginated(+page, +itemsPerPage);
		res.status(200).send(contacts)
	}catch(error){
		res.status(500).send('Internal Error');
	}
})

app.get('/contacts/:id', async(req, res) => {
	try {
		const contact = await addressBook.getContact(req.params.id)
		res.status(200).send(contact);
	} catch(error){
		if (error instanceof Error) {
			res.status(404).send({
				statusCode: 404,
				message: error.message,
				error: 'Not Found'
			})
		} else {
			res.status(500).send('Internal Error');
		}
	}
})

app.delete('/contacts/:id', async(req, res) => {
	try{
		await addressBook.deleteContact(req.params.id)
		res.status(200).send('Successful removed.');
	}catch(error){
		if (error instanceof Error) {
			res.status(404).send({
				statusCode: 404,
				message: error.message,
				error: 'Not Found'
			})
		} else {
			res.status(500).send('Internal Error');
		}
	}
})

app.put('/contacts/:id', jsonParser, async(req, res) => {
	try {
		const contact = req.body;
		const updatedContact = await addressBook.updateContact(req.params.id, contact)
		res.status(200).send(updatedContact);
	} catch(error){
		if (error instanceof Error) {
			res.status(404).send({
				statusCode: 404,
				message: error.message,
				error: 'Not Found'
			})
		} else {
			res.status(500).send('Internal Error');
		}
	}
})

app.post('/contacts', jsonParser, async(req, res) => {
	try{
		const contact = req.body;
		const addedConact = await addressBook.addContact(contact);
		res.status(201).send(addedConact)
	}catch(error){
		res.status(501).send('Internal Error');
	}
})

app.get('/', (_, res) => {
	res.sendFile(path.resolve(__dirname, '..', '../client/dist/index.html'));
});

const startServer = async () => {
	try {
		app.listen(process.env.PORT
			|| 3000, () => console.log(`server is listening on port ${process.env.PORT || 3000}`));
	} catch (error) {
		console.log(error);
	}
};
startServer()
