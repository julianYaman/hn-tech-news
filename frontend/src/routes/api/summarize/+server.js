import { PRIVATE_API_BASE_URL } from '$env/static/private';

export const GET = async ({ request }) => {

    const searchParams = new URL(request.url).searchParams;

    const res = await fetch(`${PRIVATE_API_BASE_URL}/api/summarize?id=${searchParams.get('id')}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    });

    if (res.ok) {
        const data = await res.json();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } else {
        const errorText = await res.text();
        return new Response(errorText, {
            status: res.status,
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    }

}
