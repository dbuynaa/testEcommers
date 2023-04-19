import clsx from 'clsx';
import { useEffect } from 'react';

const ErxesForm = ({
  brandId,
  formId,
  className,
  ...rest
}: {
  brandId: string;
  formId: string;
  className?: string;
}) => {
  useEffect(() => {
    const w = window as any;
    w.erxesSettings = { forms: [] };
    w.erxesSettings.forms.push({
      brand_id: brandId,
      form_id: formId,
    });

    const id = 'erxes-script-' + formId;

    const script = document.createElement('script');
    script.id = id;
    script.src =
      'https://techstore.erxes.io/widgets/build/formWidget.bundle.js';
    script.async = true;
    const entry = document.getElementsByTagName('script')[0];
    // @ts-ignore
    entry.parentNode.insertBefore(script, entry);

    return () => {
      w.erxesSettings.forms = w.erxesSettings.forms.filter(
        (form: any) => form.form_id !== formId
      );

      const script = document.getElementById(id);

      if (script) {
        script.remove();
      }

      const container = document.getElementById('erxes-container-' + formId);

      if (container) {
        container.remove();
      }

      return;
    };
  }, []);

  return (
    <div className={clsx('erxes-form', className)} {...rest}>
      <div data-erxes-embed={formId}></div>
    </div>
  );
};

export default ErxesForm;
