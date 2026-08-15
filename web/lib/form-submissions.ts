import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type SubmissionType = "contact" | "dealership";

type SubmissionRecord = {
  id: string;
  type: SubmissionType;
  data: Record<string, unknown>;
  createdAt: string;
};

const STORAGE_FILE = path.join(process.cwd(), "data", "form-submissions.json");

async function readSubmissions(): Promise<SubmissionRecord[]> {
  try {
    const fileContents = await readFile(STORAGE_FILE, "utf8");
    const parsed = JSON.parse(fileContents);

    if (Array.isArray(parsed)) {
      return parsed as SubmissionRecord[];
    }
  } catch {
    // File may not exist yet; initialize on first write.
  }

  return [];
}

async function writeSubmissions(records: SubmissionRecord[]) {
  await mkdir(path.dirname(STORAGE_FILE), { recursive: true });
  await writeFile(STORAGE_FILE, JSON.stringify(records, null, 2), "utf8");
}

export async function saveFormSubmission(
  type: SubmissionType,
  data: Record<string, unknown>,
) {
  const submissions = await readSubmissions();
  const record: SubmissionRecord = {
    id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    data,
    createdAt: new Date().toISOString(),
  };

  submissions.push(record);
  await writeSubmissions(submissions);

  return record;
}
