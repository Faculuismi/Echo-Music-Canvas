import os, json, glob

def compile_submissions():
    # Load existing canvas.json
    try:
        with open("canvas.json", "r", encoding="utf-8") as f:
            canvas_data = json.load(f)
    except FileNotFoundError:
        canvas_data = {"items": []}
    except Exception as e:
        print(f"Error reading canvas.json: {e}")
        return

    # Process all submission files
    new_entries = []
    submission_files = glob.glob("submissions/*.json")
    
    for filename in submission_files:
        try:
            with open(filename, "r", encoding="utf-8") as f:
                entries = json.load(f)
                if isinstance(entries, list):
                    new_entries.extend(entries)
            # Delete file after reading
            os.remove(filename)
            print(f"Processed and deleted: {filename}")
        except Exception as e:
            print(f"Failed to process {filename}: {e}")

    if not new_entries:
        print("No new submissions found.")
        return

    # Prepend new entries to the list
    canvas_data["items"] = new_entries + canvas_data.get("items", [])

    # Save back to canvas.json
    with open("canvas.json", "w", encoding="utf-8") as f:
        json.dump(canvas_data, f, indent=2)
        f.write('\n')
        
    print(f"Successfully appended {len(new_entries)} new entries to canvas.json.")

if __name__ == "__main__":
    compile_submissions()
