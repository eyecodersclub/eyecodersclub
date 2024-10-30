

export async function getStudentInfo(studentId){
    try {
        const response = await fetch(`https://getcharusatstudentinfo.vercel.app/getInfo?id=${studentId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        return null;
    }
}