import {
	doc,
	deleteDoc,
	getDoc,
	setDoc,
} from 'firebase/firestore';

import { db } from '../firebase';

type Request = {
	wallet: string;
	minNormalDonate:number;
	minCreateSurvey:number;
	minToVote:number;
	minAmountToCall:number;
}

export const getUserProfile = async (id: string): Promise<Request> => {

	const userDoc = doc(db, 'users', id);
	const collec = await getDoc(userDoc);

	if(!collec.data()) throw new Error(` User not exists `);

	const data = {
		wallet: collec.data().wallet,
		minNormalDonate: collec.data().minNormalDonate,
		minCreateSurvey: collec.data().minCreateSurvey,
		minToVote: collec.data().minToVote,
		minAmountToCall: collec.data().minAmountToCall,
	};

	return data;
};

export const addUser = async (data: Request, handle:string) => {

	const userDoc = doc(db, 'users', handle);
	const collec = await getDoc(userDoc);

	if(collec.data()) throw new Error(` User already exists `);

	await setDoc(doc(db, "users", handle), data);

};

export const deleteUser = async (handle: string) => {
	
	const userDocGet = doc(db, 'users', handle);
	const collec = await getDoc(userDocGet);

	if(!collec.data()) throw new Error(` User not exists `);

	const userDoc = doc(db, 'users', handle);
	await deleteDoc(userDoc);
};