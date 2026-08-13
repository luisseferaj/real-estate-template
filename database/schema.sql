-- Properties table
CREATE TABLE public.properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  location text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  gallery text[] DEFAULT '{}',
  area numeric NOT NULL DEFAULT 0,
  beds integer NOT NULL DEFAULT 0,
  baths integer NOT NULL DEFAULT 0,
  price numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'sale' CHECK (status IN ('sale', 'rent')),
  description text NOT NULL DEFAULT '',
  youtube_id text NOT NULL DEFAULT '',
  agent_id uuid REFERENCES public.agents(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Auto-update updated_at on edit
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Agents table
CREATE TABLE public.agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  photo text NOT NULL DEFAULT '',
  instagram text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Notifications table
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  image text DEFAULT '',
  video_url text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Stats table
CREATE TABLE public.stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label_al text NOT NULL,
  label_en text NOT NULL,
  value text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0
);

-- Default stats
INSERT INTO public.stats (label_al, label_en, value, sort_order) VALUES
('Prona të Listuara', 'Properties Listed', '100+', 1),
('Qytete', 'Cities', '5+', 2),
('Vite Eksperiencë', 'Years of Experience', '3+', 3),
('Klientë të Kënaqur', 'Satisfied Clients', '50+', 4);

-- Permissions
GRANT ALL ON public.properties TO anon;
GRANT ALL ON public.properties TO authenticated;
GRANT ALL ON public.agents TO anon;
GRANT ALL ON public.agents TO authenticated;
GRANT ALL ON public.notifications TO anon;
GRANT ALL ON public.notifications TO authenticated;
GRANT ALL ON public.stats TO anon;
GRANT ALL ON public.stats TO authenticated;