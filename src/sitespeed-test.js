/**
 * @class       : sitespeed-test
 * @author      : Hung Nguyen Xuan Pham (hung0913208@gmail.com)
 * @created     : Friday Feb 24, 2023 20:54:35 +07
 * @description : sitespeed-test
 */

module.exports = async function(context, commands) {

    // success test
    try {
        page_name = 'google_should_succeed'
        await commands.measure.start(page_name);
        await commands.navigate('https://google.com/', page_name);

        // mark this as a pass if it loads successfully, a hack while missing dynamic influxdb tags
        await commands.js.run('performance.mark("' + page_name + '_passed");');

        // wait by selector
        await commands.wait.bySelector('input[aria-label="Search"');

        context.log.info('... test passed');

    } catch (error) {
        await commands.js.run('performance.mark("' + page_name + '_failed");');
        context.log.info(error);
        context.log.info('... test failed');

    } finally {
        await commands.measure.stop();
    }

    // fail test
    try {
        page_name = 'google_should_fail'
        await commands.measure.start(page_name);
        await commands.navigate('https://google.com/', page_name);

        // mark this as a pass if it loads successfully, a hack while missing dynamic influxdb tags
        await commands.js.run('performance.mark("' + page_name + '_passed");');

        // wait by selector
        await commands.wait.bySelector('#madeup');

        context.log.info('... test passed');

    } catch (error) {
        await commands.js.run('performance.mark("' + page_name + '_failed");');
        context.log.info(error);
        context.log.info('... test failed');

    } finally {
        await commands.measure.stop();
    }
}
