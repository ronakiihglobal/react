export default function todoApp(list = [], action) {
  switch (action.type) {
    case 'ADDTODO':
      
    	const newLst = [
	        ...list,
	        {
	          id: 1 + Math.random(),
	          value: action.payload
	        }
	      ];
        return newLst;
    case 'DELETETODO':
        return list.filter((item) => item.id !== action.payload);
    case 'RESET':
        return [];
    case 'LOADTODO':
        return action.payload;
    default:
      return list
  }
}