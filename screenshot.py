from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto('http://localhost:5173/linktree')

    # Wait for things to load
    page.wait_for_timeout(2000)

    # Try to focus the first link to show focus-visible state
    try:
        page.keyboard.press('Tab')
        page.keyboard.press('Tab')
        page.keyboard.press('Tab')
        page.keyboard.press('Tab')
        page.wait_for_timeout(500)
        page.screenshot(path='linktree-focus.png')
    except Exception as e:
        print(f"Error: {e}")

    # Test floating nav desktop view
    page.set_viewport_size({"width": 1280, "height": 800})
    try:
        page.evaluate("document.querySelector('nav a[href=\"/linktree\"]').focus()")
        page.wait_for_timeout(500)
        page.screenshot(path='floating-nav-focus.png')
    except Exception as e:
        print(f"Error: {e}")

    # Test gallery view
    page.goto('http://localhost:5173/projects')
    page.wait_for_timeout(2000)
    try:
        page.evaluate("document.querySelector('a[href=\"/projects\"]').focus()")
        page.wait_for_timeout(500)
        page.screenshot(path='gallery-focus.png')
    except Exception as e:
        print(f"Error: {e}")

    browser.close()
