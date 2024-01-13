/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            hostname: 'res.cloudinary.com',
            protocol: 'https'
        },
        {
            hostname: 'graph.facebook.com',
            protocol: 'https'
        }
        ]
    },
    env: {
        FIREBASE_PROJECT_ID: 'centro-3df74',
        FIREBASE_CLIENT_EMAIL:
            'firebase-adminsdk-h058z@centro-3df74.iam.gserviceaccount.com',
        FIREBASE_PRIVATE_KEY:
            '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDDoWbGzzGE8rVh\nHR4jS5LK0PiUfuPzqUmSET7AsF4nZ5r7ktFyNRnAXWc3cW6NYv5MzhMhZU64JM4n\nKQIlKn0AyELy6da+fJGWAShIL8KZVo/Qg5fHgxDErSpet2zO5/FXJbXFNmDc2y6u\nndm1tY/uogflph5hvFIFMYAxV5M/bYoBoBABVn6KAi9YFFEPtV8X5Bhbk5OjS3A8\nDxgrYzZSR2e/56KSEZsJhe5cqUhCh4wtXbdvMNm1IeBk3VSFHfTobV0moY7hcrZm\nvnqnORsyD+GhpiUDHQDuM6cofrrSriTploPpeCmfD7vujIEEad8li9v8QRW/v+V1\nzEvCNDPTAgMBAAECggEAEHQauM3kVFI1fx1702wfxH8e6R5i/bNXRLm+lWZABQBp\nwI7wnrJooA07CSa5LZsN2FfctApZPJOb4x9H1uhj6xTszJFuRkcj14HxaWDa9Rqa\nrebjdRxI5MHLtnum4yAO5E1/pD6Wlvy4SGduUCIdIOzvzRjTpVS5cUZgicXb1JG0\nTFUTELaA3Is4dHjrR2zRjrLgQEeo5Vh7POn6GpCOBzu7ncjvz9W8DP6gc+bfPQA1\n/Cn6/kTJ5KncptemhUYcqCS89bT+YPp3eNLpqOv2x/fV6NKsVj5zzFIm6vaz2BpW\nUZglH3c0rbayKdSrrs5RwEmaFw9Fis+Ysq+wTaURgQKBgQDiGkM/X4V/9IqIGoWx\nbHluMh+PKtpqL/UNLmDJW6YddLpeAiLOflzRfBVkHJL4qORGxbQtnMLdj0anrXpB\nW5bQOmKpKXOZcRuRt8K8cNetw1Je+1u/AgN2XjbAOx5MSMZc1EH2dmWEI5ji5Z06\n4L76aNYaoJfO1W5Pe4jNy23NOQKBgQDdf6Kx5V29a6nzy20yA3Y6rFe4OyGDgWR6\nlQ420jdPfloAwObAWUzxja/SlfJ++qOBBZLpq8xaFVVmwZc2+WHl9+qDM7UDputf\nPG8uPksl6WrAqxf/yN2gWvN2ewyEJO1tnQS6bO1Mc+Bf4ljpFvEXVUM04VtooUFy\nM9Yd2wfVawKBgBzBeFIEBQeMA15h+STiheMU7tyXd6XPqZvejSKuzEasxNMV9HVM\nruNZo6LS24JSgI3bsRmn+USSZ0sGDilny5t6AXhANFqMfxQeSd8LfvKzh7NaxoVZ\nbTVNsCrsmeLb0paVzDnbPvf6SwR4bXHCiadxU+GZERWWIWxsaq65s6JJAoGBAI+o\n2tLa2uOiUsZmqFoJ2MLRSMuavm/Wml7PEjsIOQt7/dADTSZwRPFeXi0NSAyHb0id\nXt3jqVS8BXnyEat8L7zCAP47qSnHN127irjJemAKdkykK5qgou4AT2wG/uUuNjgj\n4Q8w2u/9MAfAfL4hPRlPGZnQmELSY+o4KKWQjBIlAoGBAIiyI1QyqddYXnWqpWmK\nmlzcv27FNINxTqB0NfCIMdpfZ7Jtn4fSQ8Zlel3su++DReb3G4dci7aL15Eh+uBp\nfIkq48u/jc2sHbtXxDpJ0L1epBZQ2YJFhN2cMcYzkKcT202pwb1BaCaBR9L+hRE2\nGz4KlZvudw4A7Gq5XRWB/Ri0\n-----END PRIVATE KEY-----\n',
        // FACEBOOK
        FACEBOOK_CLIENT_ID: '3691804557763730',
        FACEBOOK_CLIENT_SECRET: 'bf7d0fd4d1f64ec557d3bd3e58bc467b',

    }
}

module.exports = nextConfig
