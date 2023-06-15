const isAnError = (response: any) => {
    return !!response.error;
}

const showError = (entity: string, response: any) => {
    console.group(`Error on creating ${entity}`);
    console.error(`[${response.error}] ${response.message} | Code : ${response.code}`);
    console.groupEnd();
}

const showData = (entity: string, response: any) => {
    console.group(`Success on creating ${entity}`);
    for (const data of Object.entries(response)) {
        console.log(`${data[0]} : ${data[1]}`);
    }
    console.groupEnd();
}

export const printAxiosData = (entity: string, response: any, log: boolean) => {

    if (isAnError(response)) {
        showError(entity, response);
        return;
    }

    if(log) {
        showData(entity, response);
    }
}