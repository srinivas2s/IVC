
CREATE TABLE achievements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    value TEXT NOT NULL,
    label TEXT NOT NULL,
    icon TEXT NOT NULL,
    suffix TEXT,
    highlight BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

