import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ZigzagBand from '../../src/components/ZigzagBand.astro';
import ActPlateHeader from '../../src/components/ActPlateHeader.astro';

describe('primitives', () => {
  it('ZigzagBand left emits a clip-path polygon and the given color', async () => {
    const c = await AstroContainer.create();
    const html = await c.renderToString(ZigzagBand, { props: { side: 'left', color: '#E62B33' } });
    expect(html).toContain('clip-path');
    expect(html).toContain('polygon');
    expect(html).toContain('#E62B33');
  });
  it('ActPlateHeader renders label text', async () => {
    const c = await AstroContainer.create();
    const html = await c.renderToString(ActPlateHeader, { props: { label: 'Download' } });
    expect(html).toContain('Download');
  });
});
