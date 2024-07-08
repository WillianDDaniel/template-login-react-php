<?php 

function createEmailBody($title, $message, $code, $siteName)
{
    // Compose email body
    $body = "
        <!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">
        <html dir=\"ltr\" xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">
        <head>
            <meta charset=\"UTF-8\">
            <meta content=\"width=device-width, initial-scale=1\" name=\"viewport\">
            <meta name=\"x-apple-disable-message-reformatting\">
            <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">
            <meta content=\"telephone=no\" name=\"format-detection\">
            <title>{$title}</title>
        </head>
        <body>
            <div dir=\"ltr\" class=\"es-wrapper-color\">
                <table class=\"es-wrapper\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\">
                    <tbody>
                        <tr>
                            <td class=\"esd-email-paddings\" valign=\"top\">
                                <table class=\"es-content esd-footer-popover\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">
                                    <tbody>
                                        <tr>
                                            <td class=\"esd-stripe\" align=\"center\">
                                                <table class=\"es-content-body\" width=\"600\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#ffffff\" align=\"center\">
                                                    <tbody>
                                                        <tr>
                                                            <td class=\"es-p20t es-p20r es-p20l esd-structure\" align=\"left\">
                                                                <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class=\"esd-container-frame\" width=\"560\" valign=\"top\" align=\"center\">
                                                                                <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" bgcolor=\"#6fa8dc\" style=\"background-color: #6fa8dc;\">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align=\"center\" class=\"esd-block-text\">
                                                                                                <h2 style=\"color: #ffffff;\">{$title}</h2>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class=\"esd-structure es-p20t es-p20r es-p20l\" align=\"left\">
                                                                <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width=\"560\" class=\"esd-container-frame\" align=\"center\" valign=\"top\">
                                                                                <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align=\"left\" class=\"esd-block-text\">
                                                                                                <p style=\"text-align: center;\">{$message}</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class=\"esd-structure es-p20t es-p20r es-p20l\" align=\"left\">
                                                                <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width=\"560\" class=\"esd-container-frame\" align=\"center\" valign=\"top\">
                                                                                <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align=\"center\" class=\"esd-block-text\">
                                                                                                <p style=\"font-size: 45px;\">{$code}</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class=\"esd-structure es-p20t es-p20r es-p20l\" align=\"left\">
                                                                <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td width=\"560\" class=\"esd-container-frame\" align=\"center\" valign=\"top\">
                                                                                <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">
                                                                                    <tbody>
                                                                                        <tr>
                                                                                            <td align=\"center\" class=\"esd-block-text\">
                                                                                                <p>{$siteName}</p>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </body>
        </html>
    ";

    return $body;
}

?>